#!/usr/bin/env python3

import os
import sys
import json
import ast
import argparse
import importlib.util
import platform
from pathlib import Path

# Windows-specific imports
if platform.system() == "Windows":
    try:
        import ctypes
        from ctypes import wintypes
        WINDOWS_AVAILABLE = True
    except ImportError:
        WINDOWS_AVAILABLE = False
else:
    WINDOWS_AVAILABLE = False

CONFIG_FILE_NAME = ".project_summary.config.json"

# Windows file attributes
FILE_ATTRIBUTE_HIDDEN = 0x2
FILE_ATTRIBUTE_SYSTEM = 0x4
FILE_ATTRIBUTE_DIRECTORY = 0x10

DEFAULT_CONFIG = {
    "excluded_dirs": [
        "__pycache__", ".git", ".venv", "venv", "env", "node_modules", "dist",
        "build", ".idea", ".vscode", "migrations", "staticfiles", "media",
        ".pytest_cache", ".tox", ".coverage", ".mypy_cache", "htmlcov"
    ],
    "max_depth": 10,
    "target_files": {
        "django": ["manage.py", "settings.py", "urls.py", "models.py", "views.py", "forms.py", "admin.py", "serializers.py", "__init__.py"],
        "react": ["package.json", "App.js", "App.tsx", "index.js", "index.tsx", "webpack.config.js", "vite.config.js"],
        "node": ["package.json", "index.js", "server.js", "app.js", "main.js"],
        "python": ["main.py", "app.py", "__init__.py", "setup.py", "requirements.txt", "pyproject.toml"],
        "html-js": ["index.html", "main.js", "script.js", "style.css", "styles.css"],
        "go": ["go.mod", "go.sum", "main.go"],
        "rust": ["Cargo.toml", "Cargo.lock", "main.rs", "lib.rs"],
        "java": ["pom.xml", "build.gradle", "Main.java"],
        "generic": ["README.md", "README.rst", "README.txt", "LICENSE", "Makefile", "Dockerfile", ".gitignore"]
    },
    "enable_file_samples": True,
    "include_hidden_dirs": True,
    "include_system_dirs": False,
    "important_hidden_dirs": [".github", ".vscode", ".idea", ".docker", ".config", ".env", ".eslintrc", ".prettierrc"],
    "windows_system_dirs_to_exclude": [
        "System32", "Windows", "Program Files", "Program Files (x86)", 
        "ProgramData", "$Recycle.Bin", "System Volume Information"
    ],
    "unix_system_dirs_to_exclude": [".git", ".DS_Store", ".Trash"],
    "check_windows_attributes": True  # Enable Windows-specific attribute checking
}

def get_windows_file_attributes(path):
    """Get Windows file attributes for a given path."""
    if not WINDOWS_AVAILABLE:
        return None
    
    try:
        attrs = ctypes.windll.kernel32.GetFileAttributesW(path)
        if attrs == -1:  # INVALID_FILE_ATTRIBUTES
            return None
        return attrs
    except Exception:
        return None

def is_windows_hidden(path):
    """Check if a file/folder is hidden on Windows."""
    if not WINDOWS_AVAILABLE:
        return False
    
    attrs = get_windows_file_attributes(path)
    if attrs is None:
        return False
    
    return bool(attrs & FILE_ATTRIBUTE_HIDDEN)

def is_windows_system(path):
    """Check if a file/folder is a system file/folder on Windows."""
    if not WINDOWS_AVAILABLE:
        return False
    
    attrs = get_windows_file_attributes(path)
    if attrs is None:
        return False
    
    return bool(attrs & FILE_ATTRIBUTE_SYSTEM)

def load_config():
    """Load configuration from file or return default config."""
    if os.path.exists(CONFIG_FILE_NAME):
        try:
            with open(CONFIG_FILE_NAME, "r") as f:
                user_config = json.load(f)
                # Merge with defaults to ensure all keys exist
                config = DEFAULT_CONFIG.copy()
                config.update(user_config)
                return config
        except Exception as e:
            print(f"⚠️ Failed to load config file: {e}")
    return DEFAULT_CONFIG

def detect_project_type(root):
    """Detect project type based on files and structure."""
    def has_file(fname): 
        return os.path.exists(os.path.join(root, fname))
    
    def has_dir(dirname):
        return os.path.exists(os.path.join(root, dirname))
    
    # Django detection
    if has_file('manage.py'):
        return 'django'
    
    # Node.js/React detection
    if has_file('package.json'):
        try:
            with open(os.path.join(root, 'package.json')) as f:
                package_json = json.load(f)
            deps = {**package_json.get('dependencies', {}), **package_json.get('devDependencies', {})}
            
            if 'react' in deps or 'next' in deps or has_file('src/App.js') or has_file('src/App.tsx'):
                return 'react'
            if 'express' in deps or 'fastify' in deps or 'koa' in deps:
                return 'node'
            return 'node'
        except Exception:
            return 'node'
    
    # Python detection
    if has_file('pyproject.toml') or has_file('setup.py') or has_file('requirements.txt'):
        return 'python'
    if has_file('app.py') or has_file('main.py'):
        return 'python'
    
    # Go detection
    if has_file('go.mod') or has_file('main.go'):
        return 'go'
    
    # Rust detection
    if has_file('Cargo.toml'):
        return 'rust'
    
    # Java detection
    if has_file('pom.xml') or has_file('build.gradle') or has_dir('src/main/java'):
        return 'java'
    
    # HTML/JS detection
    if any(f.endswith('.html') for f in os.listdir(root) if os.path.isfile(os.path.join(root, f))):
        return 'html-js'
    
    return 'generic'

def get_folder_attributes(item_path, item_name):
    """Get comprehensive folder attributes for both Windows and Unix systems."""
    attributes = {
        'name': item_name,
        'is_dot_prefixed': item_name.startswith('.'),
        'is_windows_hidden': False,
        'is_windows_system': False,
        'is_unix_hidden': item_name.startswith('.'),
        'full_path': item_path
    }
    
    if platform.system() == "Windows" and WINDOWS_AVAILABLE:
        attributes['is_windows_hidden'] = is_windows_hidden(item_path)
        attributes['is_windows_system'] = is_windows_system(item_path)
    
    return attributes

def should_exclude_folder(item, item_path, config):
    """Determine if a folder should be excluded based on comprehensive criteria."""
    attrs = get_folder_attributes(item_path, item)
    
    # Always exclude if in excluded_dirs
    if item in config["excluded_dirs"]:
        return True, "in_excluded_dirs"
    
    # Platform-specific system directory exclusions
    if platform.system() == "Windows":
        if item in config["windows_system_dirs_to_exclude"]:
            return True, "windows_system_dir"
        
        # Check Windows system attribute
        if config.get("check_windows_attributes", True) and attrs['is_windows_system']:
            if not config.get("include_system_dirs", False):
                return True, "windows_system_attribute"
    else:
        if item in config["unix_system_dirs_to_exclude"]:
            return True, "unix_system_dir"
    
    # Handle hidden directories
    is_hidden = attrs['is_windows_hidden'] if platform.system() == "Windows" else attrs['is_unix_hidden']
    
    if is_hidden:
        if not config.get("include_hidden_dirs", True):
            return True, "hidden_dir_excluded"
        
        # Even if including hidden dirs, exclude if not in important list
        if item not in config.get("important_hidden_dirs", []):
            # Allow if it's a common development hidden folder
            dev_folders = ['.github', '.vscode', '.idea', '.docker', '.config', '.env', '.eslintrc', '.prettierrc']
            if item not in dev_folders:
                return True, "hidden_dir_not_important"
    
    return False, "included"

def list_dir_structure(path, config, depth=0, max_depth=None, top_level=False):
    """Recursively list directory structure with Windows attribute awareness."""
    if depth > (max_depth or config["max_depth"]):
        return {}
    
    structure = {}
    try:
        items = sorted(os.listdir(path))
        for item in items:
            full_path = os.path.join(path, item)
            
            if os.path.isdir(full_path):
                should_exclude, reason = should_exclude_folder(item, full_path, config)
                
                if should_exclude:
                    # Optionally include exclusion reason for debugging
                    if config.get("debug_exclusions", False):
                        structure[f"[EXCLUDED] {item}"] = f"reason: {reason}"
                    continue
                
                # Add folder attributes for Windows
                folder_info = {"type": "directory"}
                if platform.system() == "Windows" and config.get("show_windows_attributes", False):
                    attrs = get_folder_attributes(full_path, item)
                    folder_info["attributes"] = {
                        "hidden": attrs['is_windows_hidden'],
                        "system": attrs['is_windows_system']
                    }
                
                # Handle z-old special case
                sub_top_level = (item == "z-old")
                sub_structure = list_dir_structure(full_path, config, depth + 1, max_depth, sub_top_level)
                
                if sub_structure or not config.get("hide_empty_dirs", False):
                    structure[item] = sub_structure if isinstance(sub_structure, dict) and sub_structure else folder_info
            else:
                # For z-old, only include top-level files
                if os.path.basename(path) == "z-old" and depth > 1:
                    continue
                
                file_info = {"type": "file"}
                
                # Add file attributes for Windows
                if platform.system() == "Windows" and config.get("show_windows_attributes", False):
                    attrs = get_folder_attributes(full_path, item)
                    file_info["attributes"] = {
                        "hidden": attrs['is_windows_hidden'],
                        "system": attrs['is_windows_system']
                    }
                
                structure[item] = file_info if config.get("show_file_attributes", False) else "file"
                
    except PermissionError:
        structure["[Permission Denied]"] = "error"
    
    return structure

def get_target_files_for_project(project_type, config):
    """Get target files based on project type."""
    target_files = []
    
    # Add project-specific files
    if project_type in config["target_files"]:
        target_files.extend(config["target_files"][project_type])
    
    # Always include generic files
    target_files.extend(config["target_files"]["generic"])
    
    return list(set(target_files))  # Remove duplicates

def collect_file_samples(root, config, project_type):
    """Collect samples from important files."""
    samples = {}
    target_files = get_target_files_for_project(project_type, config)
    
    for dirpath, dirnames, filenames in os.walk(root):
        # Filter out excluded directories
        original_dirnames = dirnames[:]
        dirnames[:] = []
        
        for dirname in original_dirnames:
            full_dir_path = os.path.join(dirpath, dirname)
            should_exclude, _ = should_exclude_folder(dirname, full_dir_path, config)
            if not should_exclude:
                dirnames.append(dirname)
        
        for f in filenames:
            if f in target_files:
                full_path = os.path.join(dirpath, f)
                relative_path = os.path.relpath(full_path, root)
                
                try:
                    with open(full_path, 'r', encoding='utf-8') as file:
                        content = file.read()
                    
                    sample_data = {
                        "path": relative_path,
                        "content_preview": content[:500],
                        "size": len(content),
                        "lines": content.count('\n') + 1
                    }
                    
                    # Add Windows attributes if requested
                    if platform.system() == "Windows" and config.get("show_windows_attributes", False):
                        attrs = get_folder_attributes(full_path, f)
                        sample_data["windows_attributes"] = {
                            "hidden": attrs['is_windows_hidden'],
                            "system": attrs['is_windows_system']
                        }
                    
                    # Parse Python files
                    if f.endswith('.py'):
                        try:
                            parsed = ast.parse(content)
                            sample_data.update({
                                "classes": [n.name for n in ast.walk(parsed) if isinstance(n, ast.ClassDef)],
                                "functions": [n.name for n in ast.walk(parsed) if isinstance(n, ast.FunctionDef)],
                                "imports": [
                                    n.names[0].name if hasattr(n, 'names') and n.names else ''
                                    for n in ast.walk(parsed) 
                                    if isinstance(n, (ast.Import, ast.ImportFrom))
                                ]
                            })
                        except SyntaxError:
                            sample_data["parse_error"] = "Invalid Python syntax"
                    
                    # Parse JSON files
                    elif f.endswith('.json'):
                        try:
                            json_data = json.loads(content)
                            sample_data["json_keys"] = list(json_data.keys()) if isinstance(json_data, dict) else []
                        except json.JSONDecodeError:
                            sample_data["parse_error"] = "Invalid JSON syntax"
                    
                    samples[f] = sample_data
                    
                except Exception as e:
                    samples[f] = {"error": str(e), "path": relative_path}
    
    return samples

def extract_project_metadata(root, project_type):
    """Extract project-specific metadata."""
    metadata = {}
    
    if project_type == "django":
        # Try to find Django settings
        settings_candidates = [
            os.path.join(root, 'settings.py'),
            os.path.join(root, 'config', 'settings.py'),
        ]
        
        # Look for Django project structure
        for item in os.listdir(root):
            if os.path.isdir(os.path.join(root, item)):
                settings_path = os.path.join(root, item, 'settings.py')
                if os.path.exists(settings_path):
                    settings_candidates.append(settings_path)
        
        for settings_path in settings_candidates:
            if os.path.exists(settings_path):
                metadata.update(extract_django_settings(settings_path))
                break
    
    elif project_type in ["react", "node"]:
        package_json_path = os.path.join(root, 'package.json')
        if os.path.exists(package_json_path):
            try:
                with open(package_json_path, 'r') as f:
                    package_data = json.load(f)
                metadata.update({
                    "name": package_data.get("name"),
                    "version": package_data.get("version"),
                    "dependencies": list(package_data.get("dependencies", {}).keys()),
                    "devDependencies": list(package_data.get("devDependencies", {}).keys()),
                    "scripts": list(package_data.get("scripts", {}).keys())
                })
            except Exception as e:
                metadata["package_json_error"] = str(e)
    
    elif project_type == "python":
        # Check for requirements.txt
        req_path = os.path.join(root, 'requirements.txt')
        if os.path.exists(req_path):
            try:
                with open(req_path, 'r') as f:
                    requirements = [line.strip() for line in f if line.strip() and not line.startswith('#')]
                metadata["requirements"] = requirements
            except Exception as e:
                metadata["requirements_error"] = str(e)
        
        # Check for pyproject.toml
        pyproject_path = os.path.join(root, 'pyproject.toml')
        if os.path.exists(pyproject_path):
            metadata["has_pyproject_toml"] = True
    
    return metadata

def extract_django_settings(settings_path):
    """Extract Django settings information."""
    try:
        spec = importlib.util.spec_from_file_location("project_settings", settings_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        return {
            "INSTALLED_APPS": getattr(module, "INSTALLED_APPS", []),
            "DATABASES": getattr(module, "DATABASES", {}),
            "MIDDLEWARE": getattr(module, "MIDDLEWARE", []),
            "AUTH_USER_MODEL": getattr(module, "AUTH_USER_MODEL", None),
            "DEBUG": getattr(module, "DEBUG", None),
            "ALLOWED_HOSTS": getattr(module, "ALLOWED_HOSTS", []),
            "STATIC_URL": getattr(module, "STATIC_URL", None),
            "MEDIA_URL": getattr(module, "MEDIA_URL", None),
        }
    except Exception as e:
        return {"django_settings_error": str(e)}

def summarize_project(root, config):
    """Generate a comprehensive project summary."""
    project_type = detect_project_type(root)
    tree = list_dir_structure(root, config)
    
    # Collect file samples
    file_samples = collect_file_samples(root, config, project_type) if config["enable_file_samples"] else {}
    
    # Extract project metadata
    project_metadata = extract_project_metadata(root, project_type)
    
    # Get target files for this project type
    target_files = get_target_files_for_project(project_type, config)
    
    # Get platform-specific information
    platform_info = {
        "platform": platform.system(),
        "windows_attributes_available": WINDOWS_AVAILABLE,
        "checking_windows_attributes": config.get("check_windows_attributes", True) and WINDOWS_AVAILABLE
    }
    
    # Build summary
    summary = {
        "project_type": project_type,
        "root_path": root,
        "platform_info": platform_info,
        "summary": {
            "target_files": target_files,
            "found_important_files": [
                f for f in target_files 
                if any(os.path.exists(os.path.join(root, d, f)) for d in [''] + [d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d))])
            ],
            "important_dirs": [
                d for d in os.listdir(root)
                if os.path.isdir(os.path.join(root, d)) and not should_exclude_folder(d, os.path.join(root, d), config)[0]
            ],
            "hidden_dirs": [
                d for d in os.listdir(root)
                if os.path.isdir(os.path.join(root, d)) and 
                (d.startswith('.') or (WINDOWS_AVAILABLE and is_windows_hidden(os.path.join(root, d))))
                and not should_exclude_folder(d, os.path.join(root, d), config)[0]
            ] if config["include_hidden_dirs"] else [],
            "z_old_files": [
                f for f in os.listdir(os.path.join(root, "z-old"))
                if os.path.isfile(os.path.join(root, "z-old", f))
            ] if os.path.exists(os.path.join(root, "z-old")) else [],
            "excluded_dirs": config["excluded_dirs"],
            "total_files": sum(1 for _, _, files in os.walk(root) for _ in files),
            "total_dirs": sum(1 for _, dirs, _ in os.walk(root) for _ in dirs)
        },
        "directory_tree": tree,
        "file_samples": file_samples,
        "project_metadata": project_metadata
    }
    
    return summary

def main():
    parser = argparse.ArgumentParser(
        description="Generate a comprehensive project structure summary with Windows/Unix support.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                    # Generate project_summary.json
  %(prog)s --stdout           # Print to stdout
  %(prog)s --config-only      # Generate default config file
  %(prog)s --show-attrs       # Show Windows file attributes
        """
    )
    parser.add_argument('--stdout', action='store_true', 
                       help='Print JSON to stdout instead of saving to file')
    parser.add_argument('--config-only', action='store_true',
                       help='Generate default config file and exit')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Show verbose output')
    parser.add_argument('--show-attrs', action='store_true',
                       help='Show Windows file attributes in output')
    parser.add_argument('--debug-exclusions', action='store_true',
                       help='Show why directories were excluded')
    
    args = parser.parse_args()
    
    # Generate config file if requested
    if args.config_only:
        config_to_write = DEFAULT_CONFIG.copy()
        if args.show_attrs:
            config_to_write["show_windows_attributes"] = True
            config_to_write["show_file_attributes"] = True
        if args.debug_exclusions:
            config_to_write["debug_exclusions"] = True
            
        with open(CONFIG_FILE_NAME, 'w') as f:
            json.dump(config_to_write, f, indent=2)
        print(f"✅ Default config written to {CONFIG_FILE_NAME}")
        return
    
    # Load config and apply command line overrides
    config = load_config()
    if args.show_attrs:
        config["show_windows_attributes"] = True
        config["show_file_attributes"] = True
    if args.debug_exclusions:
        config["debug_exclusions"] = True
    
    root = os.getcwd()
    
    if args.verbose:
        print(f"📁 Analyzing project at: {root}")
        print(f"🖥️  Platform: {platform.system()}")
        print(f"🔧 Config loaded from: {CONFIG_FILE_NAME if os.path.exists(CONFIG_FILE_NAME) else 'defaults'}")
        if platform.system() == "Windows":
            print(f"🪟 Windows attributes support: {'✅ Available' if WINDOWS_AVAILABLE else '❌ Not available'}")
    
    summary = summarize_project(root, config)
    
    if args.verbose:
        print(f"🎯 Detected project type: {summary['project_type']}")
        print(f"📊 Found {summary['summary']['total_files']} files in {summary['summary']['total_dirs']} directories")
        if summary['summary']['hidden_dirs']:
            print(f"👁️  Hidden directories found: {', '.join(summary['summary']['hidden_dirs'])}")
    
    if args.stdout:
        print(json.dumps(summary, indent=2))
    else:
        output_file = "project_summary.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)
        print(f"✅ Summary written to {output_file}")

if __name__ == "__main__":
    main()