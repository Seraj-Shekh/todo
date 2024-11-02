import { expect } from "chai";



describe('GET Tasks', () => {
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
        const response = await fetch('http://localhost:3001/delete/15', {
            method: 'delete'
        })
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object').that.has.all.keys('id');
    })
    it ('should not delete a task that does not exist', async () => {
        const response = await fetch('http://localhost:3001/delete/200', {
            method: 'delete'
        })
        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data).to.be.an('object').that.has.all.keys('error');
    })

})