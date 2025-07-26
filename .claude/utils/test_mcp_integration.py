#!/usr/bin/env python3
"""
Test script for MCP integration capability-based requests
"""

import json
import sys
from pathlib import Path

def test_capability_mapping():
    """Test that capability mappings work correctly"""
    print("Testing MCP Capability Mapping...")
    
    # Load MCP index
    index_file = Path("2-docs/external/mcp-index.json")
    if not index_file.exists():
        print("❌ mcp-index.json not found")
        return False
    
    with open(index_file, 'r') as f:
        mcp_index = json.load(f)
    
    # Test capability mappings exist
    capability_mappings = mcp_index.get("_capability_to_server_mapping", {})
    if not capability_mappings:
        print("❌ No capability mappings found")
        return False
    
    print(f"✅ Found {len(capability_mappings)} capability mappings")
    
    # Test essential capabilities
    essential_capabilities = ["file_operations", "version_control", "memory", "structured_reasoning"]
    for cap in essential_capabilities:
        if cap not in capability_mappings:
            print(f"❌ Missing essential capability: {cap}")
            return False
        print(f"✅ Essential capability '{cap}' -> {capability_mappings[cap]['primary']}")
    
    # Test fallback chains
    web_search = capability_mappings.get("web_search", {})
    if web_search.get("fallback"):
        print(f"✅ Web search fallback chain: {web_search['primary']} -> {web_search['fallback']}")
    
    return True

def test_server_categories():
    """Test that server categories are properly organized"""
    print("\nTesting Server Categories...")
    
    index_file = Path("2-docs/external/mcp-index.json")
    with open(index_file, 'r') as f:
        mcp_index = json.load(f)
    
    # Test essential servers
    essential = mcp_index.get("_essential", {})
    if len(essential) < 4:
        print(f"❌ Expected at least 4 essential servers, found {len(essential)}")
        return False
    
    print(f"✅ Found {len(essential)} essential servers")
    
    # Test other categories
    categories = [cat for cat in mcp_index.keys() if cat.startswith('_') and cat not in ['_metadata', '_capability_to_server_mapping']]
    print(f"✅ Found {len(categories)} server categories")
    
    return True

def simulate_capability_request():
    """Simulate a capability-based request"""
    print("\nSimulating Capability Request...")
    
    # Simulate orchestrator request
    capabilities_request = {
        "primary": ["file_operations", "version_control", "web_search"],
        "secondary": ["testing_framework"],
        "emergency": ["database_operations"]
    }
    
    print(f"📋 Orchestrator requests: {capabilities_request}")
    
    # Load capability mappings
    index_file = Path("2-docs/external/mcp-index.json")
    with open(index_file, 'r') as f:
        mcp_index = json.load(f)
    
    capability_mappings = mcp_index.get("_capability_to_server_mapping", {})
    
    # Map capabilities to servers
    required_servers = set()
    fallback_servers = set()
    
    for capability_list in capabilities_request.values():
        for capability in capability_list:
            if capability in capability_mappings:
                mapping = capability_mappings[capability]
                required_servers.add(mapping["primary"])
                fallback_servers.update(mapping.get("fallback", []))
    
    print(f"🔧 Required servers: {sorted(required_servers)}")
    print(f"🔄 Fallback servers available: {sorted(fallback_servers)}")
    
    # Simulate tool availability response
    mock_tools = [
        "read_file", "write_file", "create_file",
        "git_commit", "git_branch", "git_status", 
        "search_web", "get_current_info"
    ]
    
    response = {
        "status": "ready",
        "available_tools": mock_tools,
        "server_status": {server: "connected" for server in required_servers},
        "capability_coverage": "complete"
    }
    
    print(f"✅ MCP Agent Response: {len(mock_tools)} tools ready")
    print("✅ Capability-based request simulation successful")
    
    return True

def main():
    """Run all tests"""
    print("🧪 MCP Integration Test Suite")
    print("=" * 50)
    
    tests = [
        test_capability_mapping,
        test_server_categories,
        simulate_capability_request
    ]
    
    passed = 0
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                print(f"❌ Test failed: {test.__name__}")
        except Exception as e:
            print(f"❌ Test error in {test.__name__}: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{len(tests)} tests passed")
    
    if passed == len(tests):
        print("🎉 All MCP integration tests passed!")
        return True
    else:
        print("⚠️  Some tests failed - check implementation")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)