

const tools = [
    {id:1, name: 'Hammer'},
    {id:2, name: 'Hammer2'},
    {id:3, name: 'Hammer3'},
    {id:4, name: 'Hammer4'},
    {id:5, name: 'Hammer5'},
    {id:6, name: 'Hammer6'},
    {id:7, name: 'Hammer7'},
    {id:8, name: 'Hammer8'},
    {id:9, name: 'Hammer9'},
]

module.exports.getAllTools = (req, res, next) => {
    const { ip, query, params, body, headers } = req; // Destructure the req object;

    // console.log(ip, query, params, body, headers);


    // some respond method
    // res.download(__dirname + "/tools.controller.js");
    // res.json({ "name": "abc" });
    // res.redirect('/login');

    const { limit, page } = req.query;
    console.log(limit, page);



    res.json(tools.slice(0, limit));
};

module.exports.saveATool = (req, res, next) => {
  tools.push(req.body);

  // Standard send response method (if successful)
  res.status(200).res.send({
    status: true,
    success: true,
    message: "Successfully got the data",
    data: tools,
  });

  // Standard send response method (if error)
    //   res.status(500).res.send({
    //     status: false,
    //     success: false,
    //     error: "Internal Server Error",
    //   });
}

module.exports.getToolDetails = (req, res, next) => {
    const { id } = req.params;
    

    const foundTool = tools.find(tool => tool.id === Number(id));
    res.send(foundTool);
}

module.exports.updateTool = (req, res, next) => {
    const {id} = req.params;
    const filter = { _id: id };

    const newData = tools.find(tool => tool.id === Number(id));

    newData.id = id;
    newData.name = req.body.name;

    res.send(tools);


}


module.exports.deleteATool = (req, res, next) => {
    const { id } = req.params;
    const filter = { _id: id };

    res.send(tools.filter((tool) => tool.id !== Number(id)));
}