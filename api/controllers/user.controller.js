// we call this logic controller, its the the function file to be used in routes
// this controller is called by our user.route to display a message that our API route is working

export const test = (req,res) => {
    res.json(
        {message:"Api Route is working"},
    );
}