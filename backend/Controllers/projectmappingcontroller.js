require("dotenv").config();
const client = require("../database/db");

class ProjectMapping {

    bulkimport(req, res) {
        let data = [] = req.body;
        // console.log(data.map(item => [item['projectname'], item['employeename']]))
        // data = data.map(item => [item['projectname'], item['employeename']]);
        console.log(data);

        for (const item of data) {
            console.log(item['projectname'])
            client.query(
                `INSERT INTO project(
                    projectName, users,status,deptcode,product,createdAt,updatedAt)
                    VALUES ($1, $2, true,$3, $4,NOW()::DATE,NOW()::DATE)`,

                [item['projectname'], item['employeename'], item['deptcode'], item['product']],
                (err, resp) => {
                    console.log(err);
                    if (err) {
                        // res.status(400).json({ message: "Error in DB" });
                    }
                    else {
                        // res.status(201).json({ message: "successful" })
                    }

                }
            );
        }
        res.status(201).json({ message: "successful" })
    }


    addMapping(req, res) {
        console.log(req.body)
        let { projectName, users, deptCode, product } = req.body;
        // console.log(projectName, employeeName);

        client.query(
            `INSERT INTO project(
                projectName, users,status,deptcode,product,createdAt,updatedAt)
                VALUES ($1, $2, true,$3, $4, NOW()::DATE,NOW()::DATE)`,

            [projectName, users, deptCode, product],
            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else {
                    res.status(201).json({ message: "successful" })
                }

            }
        );
    }

    getMapping(req, res) {

        // console.log(projectName, employeeName);

        client.query(
            `select * from project`,

            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else {
                    res.status(200).json(resp.rows);
                }

            }
        );
    }

    getUsers(req, res) {

        // console.log(projectName, employeeName);

        client.query(
            `select * from authentication`,

            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else {
                    res.status(200).json(resp.rows);
                }

            }
        );
    }

    getMappingbyid(req, res) {
        let id = req.params.id;

        // console.log(projectName,employeeName);
        console.log(req.params.id);
        client.query(
            `select * from project where id=($1)`,

            [id],
            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else {
                    res.status(200).json(resp.rows[0]);
                }

            }
        );
    }

    updateMapping(req, res) {
        let { id, projectName, users, product, deptCode } = req.body;
        // console.log(projectName, employeeName);

        client.query(
            ` UPDATE project
            SET projectname=($2), users=($3), product=($4), deptcode=($5), updatedat=NOW()::DATE
           WHERE id=($1)`,

            [id, projectName, users, product, deptCode],
            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else {
                    res.status(200).json({ message: "successful" })
                }

            }
        );
    }

    deleteMapping(req, res) {
        let id = req.params.id;

        // console.log(projectName,employeeName);
        console.log(req.params.id);

        client.query(
            `DELETE FROM project WHERE id = $1 `,
            [id],
            (err, resp) => {
                // console.log(resp);
                if (err) {
                    res.status(400).json({ message: "Err in DB" });
                }
                else {
                    res.status(200).json({ message: "successful in DB" });
                }
            }

        );
    }
}
module.exports = ProjectMapping;