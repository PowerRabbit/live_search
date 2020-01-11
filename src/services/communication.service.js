/* const EMPLOYEES_URL = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

const RESPONSE_TYPES = {
    ERROR: 'error',
    OK: 'ok'
};

const parseResponse = (r) => new Promise((resolve) => {
    r.json().then((data) => {
        resolve(({
            type: r.ok ? RESPONSE_TYPES.OK : RESPONSE_TYPES.ERROR,
            status: String(r.status),
            data,
            message: data.message || r.statusText
        }));
    });
});

const makeRequest = (type, url) => fetch(url, {
        method: type
    }).then((r) => {
        return parseResponse(r);
    }).catch(error => {
        this._resolver();
        return {
            type: RESPONSE_TYPES.ERROR,
            message: (error && error.message) || 'Unknown Error occured.'
        };
});

const parseEmployee = (data, included) => {
    const attributes = data.attributes;
    const accountId = data.relationships && data.relationships.account && data.relationships.account.data && data.relationships.account.data.id;
    const { firstName, lastName } = attributes;
    const account = accountId && included.find(item => item.type === 'accounts' && item.id === accountId);
    const email = account && account.attributes && account.attributes.email;

    if (firstName && lastName) {
        return {
            firstName,
            lastName,
            email
        };
    }
} */

export const getEmployeesData = () => new Promise((resolve) => {
   resolve([{"firstName":"Harriet","lastName":"McKinney","email":"harriet.mckinney@kinetar.com"},{"firstName":"Harriet","lastName":"Banks","email":"harriet.banks@kinetar.com"},{"firstName":"Mathilda","lastName":"Summers","email":"mathilda.summers@kinetar.com"},{"firstName":"Eugene","lastName":"Wong","email":"eugene.wong@kinetar.com"},{"firstName":"New","lastName":"Manager","email":"manager@kinetar.com"},{"firstName":"Marguerite","lastName":"Ryan","email":"marguerite.ryan@kinetar.com"},{"firstName":"Donald","lastName":"Butler","email":"donald.butler@kinetar.com"},{"firstName":"Jim","lastName":"Carlson","email":"jim.carlson@kinetar.com"},{"firstName":"Alta","lastName":"Maxwell","email":"alta.maxwell@kinetar.com"}]);

    /* makeRequest('GET', EMPLOYEES_URL).then(response => {
        if (response.type === RESPONSE_TYPES.ERROR) {
            throw new Error(response.message);
        }
        const result = [];

        const data = response.data && response.data.data;
        const included = response.data && response.data.included;

        if (Array.isArray(data) && Array.isArray(included)) {
           data.forEach(employeeData => {
               const employee = parseEmployee(employeeData, included);
               if (employee) {
                   result.push(employee);
               }
           });
        }

        console.log(JSON.stringify(result));

        resolve(result);
    }); */
});