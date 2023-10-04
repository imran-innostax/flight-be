#!/bin/bash
mkdir /home/ubuntu/aws-codedeploy
cd /home/ubuntu/aws-codedeploy
npm install --production
npx prisma format
npx prisma db pull
npx prisma generate