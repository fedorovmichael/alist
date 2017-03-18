
var config;

exports.loadConfig = function()
{
    config = require('./config.json');
};

exports.getConfig = function(name)
{
    if(!config[name])
    {
        throw new Error("Not exitst configuration -> " + name);
    }

    return config[name];
};

