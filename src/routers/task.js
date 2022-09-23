const express = require('express');
const router = new express.Router();
const Task = require('./models/task')


app.patch('/tasks/:id', async (req, res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid operation'});
    }

    try { 
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) { 
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => { 
    try { 
        const tasks = await User.find({})
        res.send(tasks)
    } catch (e) { 
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try { 
        const task = await Task.findById(_id)
        if(!task) { 
            return res.status(404).send()
        }

        res.send(task);
    } catch (e) { 
        res.status(500).send()
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try { 
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => { 
    const task = new Task(req.body)

    try { 
        await task.save()
        res.status(201).send(task)
    } catch(e) {    
        res.status(400).send(e)
    }
})


module.exports = router