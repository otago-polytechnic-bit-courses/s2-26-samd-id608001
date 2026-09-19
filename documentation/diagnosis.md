# Diagnosis

## Problem 1
### Description
helpers.py contians code that is unused by the project. Funtionality is also unclear - function named "do_stuff" - what is the stuff that this function does?

### Location
`toolshed_backend/sheds/helpers.py` - entire file

### Principle or Pattern Violated
YAGNI (You Aren't Gonna Need It) has been violated here.
It is clear this code used to export sheds to xml and csv. Why is unclear, but what is clear is that it isn't used anymore and it has become "dead code". 
This is what YAGNI is all about - removing code that you aren't gonna need!

### Severity
Medium to Low severity. 
Dead code is not an immediate maintainability issue, but it makes it confusing when onboarding new developers and adds unnecessary bloat to software.
There have also been many QA incidents where dead code has been used by mistake costing businesses millions.

---

## Problem 2
### Description
views.py contains a manual authentication check in multiple different views. It is the same auth check each time.

### Location
`toolshed_backend/sheds/views.py`
**lines:**
- 45 to 48
- 94 to 97
- 123 to 126

### Principle or Pattern Violated
DRY (Don't Repeat Yourself) has been violated here.
If the auth check needed to be changed in some way, it would need to be updated in 3 separate locations. Likewise if an auth check needed to be added to a new view, then it would have to be typed out manually again.
This is exactly what DRY forces you to avoid - repeating the same code over and over.

### Severity
Medium Severity.
If the auth check needs changed for any reason, it has to be changed in multiple locations which could lead to a check not being updated and creating a broken auth system for that endpoint. 

---

## Problem 3
### Description
views.py manually constructs json responses - sometimes multiple times per view.

### Location
`toolshed_backend/sheds/views.py`
**lines:**
- 24 to 32
- 34 to 43
- 50 to 64
- 77 to 91
- 104 to 120
- 144 to 150
- 165 to 169

### Principle or Pattern Violated
Not only does this clearly violate DRY (Don't Repeat Yourself) this also violates the Adapter Design pattern. The Adapter design pattern ensures that third party serializers (JSON in this case) are wrapped in a custom interface to ensure that the implementing code stays clean and unware if things were to change (for example from JSON to XML).

### Severity
High Severity.
This problem violates 2 standards and there are already small differences between what some of the endpoints return (some return a list of tools, some return the tools count) the returned fields should be consistent through out. This problem is already being effected by maintainability issues.

---

## Problem 4
### Description
views.py contains direct data access scattered across views. Data access is not consistent. When getting sheds the views also perform an extra query per shed that is listed to obtain a list of tools in that shed.

### Location
`toolshed_backend/sheds/views.py`
**lines:**
- 16 to 43
- 72
- 77 to 83
- 139
- 144 to 149

### Principle or Pattern Violated
A Programming Principle, A Design pattern and a best practice have been violated.
First off, this obviously violates DRY (Don't Repeat Yourself), the data access is repeated across the views.
Secondly, the Repository pattern has been clearly violated as the data access is not behind one interface and is scattered throughout the views.
Thirdly, the extra lookups per shed violates the N+1 query (Unlisted Violation #1) best practice which prevents multiple database lookups occuring when one database query could easily solve the problem.

### Severity
High Severity.
Not only is this problem violating both a best practice and a design pattern it is also creating performance problems by violating the N+1 query best practice. This data access is not maintainable at all right now, multiple locations where data access is defined plus multiple different ways used of obtaining data on top of this not being easy to change to a different storage mechanism mean this is a critical problem.

---

## Problem 5
### Description
views.py contains multiple manual definitions for permission checks.

### Location
`toolshed_backend/sheds/views.py`
**lines:**
- 98 to 102
- 127 to 131

### Principle or Pattern Violated
This violates both DRY (Don't Repeat Yourself) and the Strategy Design Pattern which aims to extract code into different interfaces or classes so that different ones cna be used and applied at runtime. 

### Severity
Medium Severity.
This clearly violates DRY and the Strategy Design Pattern, any change to permissions requires them to be updated and maintained in multiple places. Permissions cannot be chosen during runtime and must be hardcoded.

---

## Problem 6
### Description
The environment is not easily reproducible. It is unknown what version of django, DRF or other python packages the application is meant to be used with.

### Location
`toolshed_backend/requirements.txt` - File is missing

### Principle or Pattern Violated
This violates the evironment reproduciblity best practice (Unlisted Violation #2) which helps to avoid the classic problem of "But it works fine on my machine!!". Without defining what packages and versions are being used, it comes down to guess work and a later version of a package may have been released that now breaks the application.

### Severity
Medium Severity.
The application seems to currently work on the latest versions of Django and DRF but this may not be the case in the future and affects the maintainability of the application across different development or deployment environments.

---

Diagnosis has been limited to 6 problems for breivity - please see [[initial-findings]] for notes from a first look at the application