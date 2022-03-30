const express = require('express');
const app = express();
var methodOverride = require('method-override');
const path = require('path');
const port = 8080;
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));

app.use(methodOverride('_method'))
app.use(express.static('assets'));
app.use(express.urlencoded({
    extended: true
}));



let detail = {};
detail.education_detail = [];
detail.project = [];
detail.work_experience = [];
detail.achievement = [];



app.get("/", (req, res) => {
    res.render('index', {
        detail: detail
    });
});
app.get("/personal-detail", (req, res) => {
    res.render('personal-detail')
});
app.get("/education-detail", (req, res) => {
    res.render('education-detail');
});
app.get("/technical-skills", (req, res) => {
    res.render('technical-skills');
});
app.get("/project", (req, res) => {;
    res.render('project');
});
app.get('/work-experience', (req, res) => {
    res.render('work-experience');
});
app.get('/achievement', (req, res) => {
    res.render('achievement');
});
app.get('/preview', (req, res) => {
    res.render('preview', {
        detail: detail
    });
});
app.get('/clear', (req, res) => {
    detail = {};
    res.redirect('/');
})


// EDIT FORM ROUTES
app.get('/personal-detail/:id', (req, res) => {
    res.render('edit-personal-detail', {
        detail: detail['personal_detail']
    });
});
app.get('/education-detail/:id', (req, res) => {
    let ind = -1;
    const id = req.params.id;
    for (let i = 0; i < detail.education_detail.length; i++) {
        let match = detail.education_detail[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        res.send("NO SUCH ID FOUND!!!");
    } else {
        res.render('edit-education-detail', {
            detail: detail.education_detail[ind]
        });
    }
});
app.get('/technical-skills/:id', (req, res) => {
    res.render('edit-technical-skill', {
        detail: detail['technical_skills']
    });
});
app.get('/project/:id', (req, res) => {
    let ind = -1;
    const id = req.params.id;
    for (let i = 0; i < detail.project.length; i++) {
        let match = detail.project[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        res.send("NO SUCH ID FOUND!!!");
    } else {
        res.render('edit-project', {
            detail: detail.project[ind]
        });
    }
});
app.get('/work-experience/:id', (req, res) => {
    let ind = -1;
    const id = req.params.id;
    for (let i = 0; i < detail.work_experience.length; i++) {
        let match = detail.work_experience[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        res.send("NO SUCH ID FOUND!!!");
    } else {
        res.render('edit-work-experience', {
            detail: detail.work_experience[ind]
        });
    }
});
app.get('/achievements/:id', (req, res) => {
    let ind = -1;
    const id = req.params.id;
    for (let i = 0; i < detail.achievement.length; i++) {
        let match = detail.achievement[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        res.send("NO SUCH ID FOUND!!!");
    } else {
        res.render('edit-achievement', {
            detail: detail.achievement[ind]
        });
    }
});




app.post("/personal-detail", (req, res) => {
    req.body.id = uuidv4();
    detail.personal_detail = req.body;
    res.redirect('/');
});
app.post("/education-detail", (req, res) => {
    req.body.id = uuidv4();
    detail.education_detail.push(req.body);
    res.redirect('/');
});
app.post("/technical-skills", (req, res) => {
    req.body.id = uuidv4();
    detail.technical_skills = req.body;
    res.redirect('/');
});
app.post('/project', (req, res) => {
    req.body.id = uuidv4();
    detail.project.push(req.body);
    res.redirect('/');
});
app.post('/work-experience', (req, res) => {
    req.body.id = uuidv4();
    detail.work_experience.push(req.body);
    res.redirect('/');
});
app.post('/achievement', (req, res) => {
    req.body.id = uuidv4();
    detail.achievement.push(req.body);
    res.redirect('/');
});



app.patch("/personal-detail/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    detail.personal_detail = req.body;
    res.redirect('/');
});
app.patch("/education-detail/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.education_detail.length; i++) {
        let match = detail.education_detail[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail.education_detail[ind] = req.body;
    res.redirect('/');
});
app.patch("/technical-skills/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    detail.technical_skills = req.body;
    res.redirect('/');
});
app.patch("/project/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.project.length; i++) {
        let match = detail.project[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail.project[ind] = req.body;
    res.redirect('/');
});
app.patch("/work-experience/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.work_experience.length; i++) {
        let match = detail.work_experience[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail.work_experience[ind] = req.body;
    res.redirect('/');
});
app.patch("/achievement/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.achievement.length; i++) {
        let match = detail.achievement[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail.achievement[ind] = req.body;
    res.redirect('/');
});



// delete
app.delete("/personal-detail/:id", (req, res) => {
    delete detail['personal_detail'];
    res.redirect('/');
});
app.delete("/education-detail/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    console.log(detail.education_detail.length);
    for (let i = 0; i < detail.education_detail.length; i++) {
        let match = detail.education_detail[i].id;
        console.log(id + " " + match);
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail['education_detail'].splice(ind, 1);
    res.redirect('/');
});
app.delete("/technical-skills/:id", (req, res) => {
    delete detail['technical_skills'];
    res.redirect('/');
});
app.delete("/project/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.project.length; i++) {
        let match = detail.project[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail['project'].splice(ind, 1);
    res.redirect('/');
});
app.delete("/work-experience/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.work_experience.length; i++) {
        let match = detail.work_experience[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail['work_experience'].splice(ind, 1);
    res.redirect('/');
});
app.delete("/achievements/:id", (req, res) => {
    const id = req.params.id;
    req.body.id = id;
    let ind = -1;
    for (let i = 0; i < detail.achievement.length; i++) {
        let match = detail.achievement[i].id;
        if (match == id) {
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        return res.send("NO SUCH ID FOUND!!!");
    }
    detail['achievement'].splice(ind, 1);
    res.redirect('/');
});

app.listen(port, function() {
    console.log("Server is running on port", port);
})