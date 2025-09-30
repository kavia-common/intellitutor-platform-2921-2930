#!/bin/bash
cd /home/kavia/workspace/code-generation/intellitutor-platform-2921-2930/tutor_platform_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

