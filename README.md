# Braves-Systems-Developer
This repository contains the frontend and backend code for a web application analyzing MLB Batted Ball data from April, 2018. To access the application, please navigate to [this link in your browser](http://ec2-3-145-163-230.us-east-2.compute.amazonaws.com/)

## Prerequisites

- Python 3.7 or higher
- npm version 8.5.1
- pip
- git
- venv (python3-venv)

## How to Run
1. Clone this repository

```bash
git clone https://github.com/camdenrogers/Braves-Systems-Developer.git
```

2. cd into the Braves-Systems-Developer/flask-server directory

```bash
cd Braves-Systems-Developer/flask-server
```
3. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

4. Install all dependencies / modules

```bash
pip install -r requirements.txt
```
5. Install sklearn
```bash
pip install scikit-learn
```
  
6. Run the backend

```bash
python3 server.py
```
7. Open a new terminal (keep the backend running in your other terminal)
8. cd into the Braves-Systems-Developer/client directory

```bash
cd Braves-Systems-Developer/client
```
9. Install react-scripts

```bash
npm install react-scripts
```
10. Run the frontend

```bash
npm start
```
11. Navigate to [http://localhost:3000](http://localhost:3000)

