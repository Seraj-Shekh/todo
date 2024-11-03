import { expect } from "chai";
import { initializeTestDb, insertTestUser } from "./helper/test.js";



describe('GET Tasks', () => {
    before(() => {
        initializeTestDb();
    })

    it ('should return all tasks', async () => {
        const response = await fetch ('http://localhost:3001/');
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('array').that.is.not.empty;
        expect(data[0]).to.include.all.keys('id', 'description')
    })
})

describe ('POST task', () => {
    it ('should create a new task', async () => {
        const response = await fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: 'Task from unit test'})
        })
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object').that.has.all.keys('id');
    })
    it ('should not post a task wihtout description', async () => {
        const response = await fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data).to.be.an('object').that.has.all.keys('error');
    })
})

describe('DELETE task', () => {
    it ('should delete a task', async () => {
        const response = await fetch('http://localhost:3001/delete/88', {
            method: 'DELETE'
        });
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object').that.has.all.keys('id', 'message');  // Expect both 'id' and 'message' keys
    });

    it ('should not delete a task that does not exist', async () => {
        const response = await fetch('http://localhost:3001/delete/200', {
            method: 'DELETE'
        });
        const data = await response.json();

        expect(response.status).to.equal(404);  // Now expecting a 404 status for non-existent tasks
        expect(data).to.be.an('object').that.has.all.keys('error');  // Expecting 'error' key in response
    });
});

describe('POST register', () => {
    const email = 'register2@gmail.com'
    const password = 'password'
    it ('should register a user with valid email and password', async () => {
        const response = await fetch('http://localhost:3001/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':email, 'password':password})
        })
        const data = await response.json();

        expect(response.status).to.equal(201,data.error);
        expect(data).to.be.an('object').that.has.all.keys('id', 'email');
    })
    
})

//TEST FOE LOGIN
describe('POST login', () => {
    const email = 'registerd@gmail.com'
    const password = 'password'
    insertTestUser(email, password)
    it ('should login a user with valid email and password', async () => {
        const response = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':email, 'password':password})
        })
        const data = await response.json();

        expect(response.status).to.equal(200,data.error);
        expect(data).to.be.an('object').that.has.all.keys('id', 'email', 'token');
    })
})