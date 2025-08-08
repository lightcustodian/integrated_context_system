We are working on enhancing our Context Engineering project in the current working directory. Please review: 
1. CE.md: Current description of our project
2. Files in the .claude/commands/ directory

I had some issues running this on a project:
1. The agent made changes that broke the system. The system should have instructions to do a git commit before every major code change (minimum of 1 per new feature). I am not sure how best to configure this optimize and qa. What are your thoughts? I think this should be configured at the CLAUDE.md level rather than at the command level so it works even if we need to make changes outside of the commands.
2. The instance of Claude Code was constantly telling me that something was complete when it was not. An web frontend work should involve the Puppeteer MCP server, should attempt to access the website (usually at http://localhost), view the raw html, and verify with Puppeteer. This should be configured in the appropriate commands, but it should also be configured in the CLAUDE.md file. 

But before we start, I want to make sure that you understand what we are doing and our goals: 
1. Please explain to me what you understand about: 
	1. our goals
	2. what we want your help to achieve 
2. Do you have any questions about? 
	1. our goals
	2. what we want your help to achieve 
3. Do you need any further information before we continue?
4. Provide your response in response_[date]_[time]_[task_name].md