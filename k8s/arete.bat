@echo off
echo Running My Commands...

rem Command 1
echo Executing redis setup
kubectl apply -f redis-service.yaml

rem Command 2
echo Executing api gateway setup
kubectl apply -f start.yaml


rem Command 3
echo Executing the rest
kubectl apply -f .

echo All commands executed.
