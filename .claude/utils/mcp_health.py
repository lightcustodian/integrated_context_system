import json
import time
import subprocess
from pathlib import Path
import logging

class MCPHealthMonitor:
    def __init__(self, index_file_path="2-docs/external/mcp_index.json"):
        self.index_file = Path(index_file_path)
        self.registry_file = Path("2-docs/external/runtime-mcp-registry.json")
        self.logger = self._setup_logging()
        
    def _setup_logging(self):
        logging.basicConfig(
            filename='.claude/logs/mcp_health.log',
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        return logging.getLogger(__name__)

    def check_server_health(self, server_config):
        """Simple health check for MCP server using validation command"""
        try:
            validation_cmd = server_config.get('validation', '').split()
            if not validation_cmd:
                return False
                
            result = subprocess.run(
                validation_cmd,
                capture_output=True, 
                timeout=10,
                text=True
            )
            return result.returncode == 0
        except Exception as e:
            self.logger.error(f"Health check failed for {server_config.get('server', 'unknown')}: {e}")
            return False

    def update_registry(self):
        """Update runtime registry with current server status"""
        try:
            # Load MCP index
            with open(self.index_file, 'r') as f:
                mcp_index = json.load(f)
            
            registry = {
                "last_updated": time.time(),
                "servers": {},
                "capability_mappings": mcp_index.get("_capability_to_server_mapping", {}),
                "connection_pool": {},
                "health_status": "monitoring"
            }
            
            # Check health of all servers across categories
            for category_name, category_servers in mcp_index.items():
                if category_name.startswith('_'):
                    continue
                    
                for server_name, server_config in category_servers.items():
                    is_healthy = self.check_server_health(server_config)
                    registry["servers"][server_name] = {
                        "status": "healthy" if is_healthy else "offline",
                        "server": server_config["server"],
                        "priority": server_config.get("priority", 1),
                        "capabilities": server_config.get("provides", []),
                        "capability_mapping": server_config.get("capability_mapping", ""),
                        "category": server_config.get("category", "unknown"),
                        "last_checked": time.time(),
                        "enabled": server_config.get("enabled", False)
                    }
            
            # Save registry
            self.registry_file.parent.mkdir(parents=True, exist_ok=True)
            with open(self.registry_file, 'w') as f:
                json.dump(registry, f, indent=2)
                
            self.logger.info(f"Registry updated with {len(registry['servers'])} servers")
            return registry
            
        except Exception as e:
            self.logger.error(f"Failed to update registry: {e}")
            return None

    def monitor_health(self):
        """Main health monitoring loop"""
        self.logger.info("Starting MCP health monitoring")
        while True:
            try:
                registry = self.update_registry()
                if registry:
                    self.cleanup_stale_connections()
                time.sleep(300)  # Check every 5 minutes
            except KeyboardInterrupt:
                self.logger.info("Health monitoring stopped")
                break
            except Exception as e:
                self.logger.error(f"Health monitoring error: {e}")
                time.sleep(60)  # Wait 1 minute before retry

    def cleanup_stale_connections(self):
        """Remove unused connections to free resources"""
        try:
            if self.registry_file.exists():
                with open(self.registry_file, 'r') as f:
                    registry = json.load(f)
                
                current_time = time.time()
                connection_pool = registry.get("connection_pool", {})
                
                # Remove connections not used in last hour
                stale_connections = []
                for conn_id, conn_info in connection_pool.items():
                    last_used = conn_info.get("last_used", 0)
                    if current_time - last_used > 3600:  # 1 hour
                        stale_connections.append(conn_id)
                
                for conn_id in stale_connections:
                    del connection_pool[conn_id]
                
                if stale_connections:
                    registry["connection_pool"] = connection_pool
                    with open(self.registry_file, 'w') as f:
                        json.dump(registry, f, indent=2)
                    self.logger.info(f"Cleaned up {len(stale_connections)} stale connections")
                    
        except Exception as e:
            self.logger.error(f"Connection cleanup failed: {e}")

if __name__ == "__main__":
    monitor = MCPHealthMonitor()
    monitor.monitor_health()