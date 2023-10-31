# Braves-Systems-Developer
This repository contains the frontend and backend code for a web application analyzing MLB Batted Ball data from April, 2018. To access the application, please navigate to [this link in your browser](http://ec2-3-145-163-230.us-east-2.compute.amazonaws.com/)

## Application Overview
This application is a simple web application that calculates and displays statistics based on MLB Batted Ball Data from April, 2018. You can see the statistics for all batters vs. all pitchers, a specific pitcher vs. all batters, a specific batter vs. all pitchers, or a specific pitcher vs. a specific batter.

### Glossary of Statistics
* **Hits (H):** A count of batted ball events that resulted in a single, double, triple, or home run.
* **At-Bats (AB):** A count of batted ball events resulting in any outcome except for "sacrifice" or "undefined". Closer analysis showed that the majority of the "undefined" events were foul balls while some were other events such as hit-by-pitch; neither of which count as at-bats.
* **Batting Average (AVG):** The number of hits divided bt the number of at-bats
* **Expected Batting Average (xBA):** The expected batting average based on the batted ball data (see further description of how expected statistics were calculated below)
* **Slugging % (SLG):** Calculated with [1(singles) + 2(doubles) + 3(triples) + 4(HR)]/AB
* **Expected Slugging % (xSLG):** The expected slugging % based on the batted ball data (see further description of how expected statistics were calculated below)
* **Home Runs (HR):** The number of home runs
* **Home Run Rate (HR%):** the number of home runs divided by the number of at-bats

The remaining statistics are simply averages across all batted ball events for the selected players including:
* **Average Exit Velocity**
* **Average Launch Angle**
* **Average Exit Direction**
* **Average Hit Distance**
* **Average Hang Time**
* **Average Hit Spin Rate**

## Prerequisites

- Python 3.7 or higher
- npm version 8.5.1
- pip
- git
- venv (python3-venv)

## How to Run
If you want to run the code in this repository on your local machine rather than accessing it via [this link in your browser](http://ec2-3-145-163-230.us-east-2.compute.amazonaws.com/), please follow the step-by-step instructions below. Please note these commands are for MacOS or Linux. However, the instructions can be followed on Windows as well with slight variations in the commands. 

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

