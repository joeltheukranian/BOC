# BOC Test ReadMe
Build: mvn clean install

Run Server: 

a. Eclipse: Run com.boc.SpringBootWebApplication.java
 
OR 

b. Command line: java -jar target\boc_test-1.0.jar

JDK: JDK1.8

Browser: http://localhost:8888

Files:
- eng-climate-summary_badStationName.csv: CSV file with bad column name for station. Must fail Junit test
- eng-climate-summary.csv: CSV file provided 

