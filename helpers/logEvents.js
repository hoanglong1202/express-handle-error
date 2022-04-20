const fs = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');

const filename = path.join(__dirname, '../Logs', 'serverLogs.log');

const logEvents = async (msg) => {
  const datetime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`;
  const content = `${datetime}---${msg}\n`;

  try {
    fs.appendFile(filename, content);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = logEvents;
