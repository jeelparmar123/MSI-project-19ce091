require("dotenv").config();
const client = require("../database/db");

class ProjectMapping {
    addMapping(req, res) {
        let { projectName, employeeName } = req.body;
        // console.log(projectName, employeeName);

        client.query(
            `INSERT INTO projectmapping(
                projectname, employeename)
                VALUES ($1, $2)`,

            [projectName,employeeName],
            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else{
                    res.status(201).json({ message:"successful"})
                }

            }
        );
    }

     getMapping(req, res) {
      
        // console.log(projectName, employeeName);

        client.query(
            `select * from projectmapping`,

            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else{
                    res.status(200).json(resp.rows);
                }

            }
        );
    }

    updateMapping(req, res) {
        let { projectName, employeeName } = req.body;
        // console.log(projectName, employeeName);

        client.query(
            ` UPDATE projectmapping
            SET projectname='motorola', employeename='harshilparmar'
           WHERE employeename=($1)`,

            [employeeName],
            (err, resp) => {
                console.log(err);
                if (err) {
                    res.status(400).json({ message: "Error in DB" });
                }
                else{
                    res.status(200).json({ message:"successful"})
                }

            }
        );
    }

    deleteMapping(req,res){
        let{projectName, employeeName}= req.body;

        // console.log(projectName,employeeName);

        client.query(
            `DELETE FROM projectmapping WHERE employeeName = ($1) `,
            [employeeName],
            (err,resp)=>{
                console.log(err);
                if(err){
                    res.status(400).json({message: "Err in DB"});
                }
                else{
                    res.status(200).json({message: "successful in DB"});
                }
            }

        );
    }
}
module.exports = ProjectMapping;