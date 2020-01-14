### About
The application is built using create-react-app and Redux.
There are 3 components:
- ManagerForm, which represents the input and implements most of the logic.
- ManagerEntry, which outputs the employee data.
- ArrowIcon - just a SVG icon.

The data is fetched from the server and cleaned by the communication service.
The list of all employees and the filtered list of employees are stored in the Redux storage.


### How to run
1. Clone the repository.
2. Run "npm install"
3. Run "npm run start"
4. The server will start automatically on http://localhost:3000/

### How to use
Just type or insert letters.

### Not completely clear
According to design the list is sorted in alphabetical order by first names, but in reverse order - by last names.

### How to run tests
Run "npm run test"

### What should be improved
Accessibility.
ManagerForm might be more reactive.
More tests are required (it appeared to be not so easy to test stateless components and the hooks-based logic).
