//configure environment variables
process.env.HOSTNAME = "localhost"
process.env.PORT = "3000"
process.env.DB_URL = "mongodb+srv://admin:ilovecssweng@jaelle-residences.ptlf1.mongodb.net/jaelle-residences-db?retryWrites=true&w=majority"

//import the necessary modules
const path = require('path');
const electron = require('electron');
const server = require('./server.js');
const { ipcMain } = require('electron');
const printEvent = require('./controllers/print-controller');
const fs = require('fs/promises')
const os = require('os')

//retrieves the necessary attributes from electron
const {app, BrowserWindow} = electron;

let mainWindow;
let addWindow;

//create new window once electron finishes initialization
app.on('ready', function() {

    //create new window
    mainWindow = new BrowserWindow({
        title: "Jaelle Residences",
        // icon: "",
        show: false,
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    //remove menu bar
    mainWindow.setMenuBarVisibility(false);

    //maximize and show the window
    mainWindow.maximize();
    mainWindow.show();

    //opens the web application
    mainWindow.loadURL(`http://${process.env.HOSTNAME}:${process.env.PORT}/`);

    //terminate the electron application on window close
    mainWindow.on('closed', function() {
        app.quit();
    });

});

ipcMain.on('print:goto', (event, bookingID) => {
    createAddWindow(bookingID);
});

ipcMain.on('print:execute', (event) => {
  print(event.sender);
});

printEvent.onPrintEvent(createAddWindow);

function createAddWindow(bookingID){
  addWindow = new BrowserWindow({
      width: 720,
      height: 480,
      title: 'Receipt Preview',
      webPreferences:{
          nodeIntegration: true,
          contextIsolation: false
      }
  });
  addWindow.loadURL(`http://localhost:3000/booking/${bookingID}/print`);
  addWindow.webContents.on('did-finish-load', async () => {
    const pdf = await addWindow.webContents.printToPDF({});   
    const dateOfPrint = new Date().toLocaleDateString().replaceAll('/', '-')
    const filePath = `${os.homedir()}/Desktop/receipts/${dateOfPrint}__${bookingID}.pdf`;

    try {
        await fs.writeFile(filePath, pdf)
    } catch(error) {
        await fs.mkdir(`${os.homedir()}/Desktop/receipts/`)
        await fs.writeFile(filePath, pdf)
    }
  })
  addWindow.on('closed', () => addWindow = null);
}

function getDefaultPrinterIndex(window) {
  let printers = window.getPrinters();
  for (let [index, printer] of printers.entries()) {
    if (printer.isDefault) {
      return index;
    }
  }
}

function print(window, copies = 3, delay = 1500) {
  let counter = 1;
  let printDataPassed = false;
  let printerIndex = getDefaultPrinterIndex(window);
  _print(window);

  //checks whether to print another copy or wait
  //does nothing when the printer is printing the current copy, status === 1024
  //if the printer is done printing, proceed to print next copy after a certain delay
  //stops checking if all copies have been printed
  let interval = setInterval(() => {
    if (window.getPrinters()[printerIndex].status === 1024) {
      printDataPassed = true;
    } else if (
      printDataPassed &&
      window.getPrinters()[printerIndex].status === 0
    ) {
      setTimeout( () => { _print(window) }, delay);
      printDataPassed = false; 
      counter++;
    } 

    if (counter >= copies) {
      clearInterval(interval);
    }
  }, 10);
}

function _print(window) {
  window.print({
    silent: true,
  });
}