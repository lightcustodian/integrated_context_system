#!/usr/bin/env python3
"""
Simple state management for Context Engineering system.
Handles multi-level state tracking and recovery.
"""

import json
import os
from datetime import datetime
from typing import Dict, Any, Optional

class StateManager:
    """Minimal state management for simple_context system."""
    
    def __init__(self, state_file: str = ".claude/state/session.json"):
        self.state_file = state_file
        self.ensure_state_dir()
    
    def ensure_state_dir(self):
        """Create state directory if it doesn't exist."""
        os.makedirs(os.path.dirname(self.state_file), exist_ok=True)
    
    def load_state(self) -> Dict[str, Any]:
        """Load current state from file."""
        if not os.path.exists(self.state_file):
            return self._default_state()
        
        try:
            with open(self.state_file, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return self._default_state()
    
    def save_state(self, state: Dict[str, Any]):
        """Save state to file."""
        state['last_updated'] = datetime.now().isoformat()
        with open(self.state_file, 'w') as f:
            json.dump(state, f, indent=2)
    
    def update_command(self, command: str, step: int = 1, step_name: str = ""):
        """Update current command and step."""
        state = self.load_state()
        state.update({
            'current_command': command,
            'current_step': step,
            'step_name': step_name,
            'last_updated': datetime.now().isoformat()
        })
        self.save_state(state)
    
    def update_prototype(self, prototype: str, status: str = "in_progress"):
        """Update current prototype being worked on."""
        state = self.load_state()
        state['current_prototype'] = prototype
        
        if 'prototype_status' not in state:
            state['prototype_status'] = {}
        state['prototype_status'][prototype] = status
        
        self.save_state(state)
    
    def complete_prototype(self, prototype: str):
        """Mark prototype as complete."""
        state = self.load_state()
        
        # Add to completed list
        if 'completed_prototypes' not in state:
            state['completed_prototypes'] = []
        if prototype not in state['completed_prototypes']:
            state['completed_prototypes'].append(prototype)
        
        # Update status
        if 'prototype_status' not in state:
            state['prototype_status'] = {}
        state['prototype_status'][prototype] = 'complete'
        
        self.save_state(state)
    
    def update_feature(self, feature: str):
        """Update current feature being worked on."""
        state = self.load_state()
        state['current_feature'] = feature
        self.save_state(state)
    
    def update_task(self, task: str):
        """Update current task being worked on."""
        state = self.load_state()
        state['current_task'] = task
        self.save_state(state)
    
    def get_current_context(self) -> Dict[str, Any]:
        """Get current working context."""
        state = self.load_state()
        return {
            'command': state.get('current_command'),
            'step': state.get('current_step'),
            'step_name': state.get('step_name'),
            'prototype': state.get('current_prototype'),
            'feature': state.get('current_feature'),
            'task': state.get('current_task')
        }
    
    def can_resume(self) -> bool:
        """Check if there's a state to resume from."""
        state = self.load_state()
        return state.get('current_command') is not None
    
    def _default_state(self) -> Dict[str, Any]:
        """Default empty state structure."""
        return {
            'current_command': None,
            'current_step': 0,
            'step_name': '',
            'current_prototype': None,
            'current_feature': None,
            'current_task': None,
            'completed_prototypes': [],
            'prototype_status': {},
            'last_updated': datetime.now().isoformat()
        }

# Utility functions for easy use in commands
def update_step(command: str, step: int, step_name: str):
    """Quick function to update command step."""
    manager = StateManager()
    manager.update_command(command, step, step_name)

def update_prototype_progress(prototype: str, feature: str = None, task: str = None):
    """Quick function to update prototype progress."""
    manager = StateManager()
    manager.update_prototype(prototype)
    if feature:
        manager.update_feature(feature)
    if task:
        manager.update_task(task)

def get_context():
    """Quick function to get current context."""
    manager = StateManager()
    return manager.get_current_context()

def mark_prototype_complete(prototype: str):
    """Quick function to mark prototype complete."""
    manager = StateManager()
    manager.complete_prototype(prototype)