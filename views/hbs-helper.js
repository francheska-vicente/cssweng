const hbs = require(`hbs`);

//returns the date in the format of MON. DD, YYYY
hbs.registerHelper('beautifyDate', function(date) {
    if (date) {
        date = new Date(date);
        let month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][date.getMonth()];
    	let day = date.getDate().toString().padStart(2, 0);
    	let year = date.getFullYear().toString();
        return `${month}. ${day}, ${year}`;
    } else {
        return '';
    }

});

//returns the date in the format of YYYY-MM-DD
hbs.registerHelper('formatDate', function(date) {
    if (date) {
        date = new Date(date);
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString().padStart(2, 0);
    	let day = date.getDate().toString().padStart(2, 0);
        return `${year}-${month}-${day}`;
    } else {
        return '';
    }

});

//this function is used to select an option in a drop-down list
hbs.registerHelper('select', function(value, option) {
    if (value == option) {
        return 'selected';
    } else {
        return '';
    }
});

//returns the date in the format of YYYY-MM
hbs.registerHelper('getCurrentMonthYear', function() {
    let today = new Date();
	let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString().padStart(2, 0);
    return `${year}-${month}`;
});

//returns the date in the format of YYYY-MM-DD
hbs.registerHelper('getMonthYear', function(date) {
    date = new Date(date);
	let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, 0);
    return `${year}-${month}`;
});

//returns the previous month
hbs.registerHelper('getPrevMonth', function(date) {
	let current;
	if (date.getMonth() == 0) {
	    current = new Date(date.getFullYear() - 1, 11, 1);
	} else {
	    current = new Date(date.getFullYear(), date.getMonth() - 1, 1);
	}
    return `${current.getFullYear()}-${current.getMonth()+1}`;
});

//returns the next month
hbs.registerHelper('getNextMonth', function(date) {
	let current;
	if (date.getMonth() == 11) {
	    current = new Date(date.getFullYear() + 1, 0, 1);
	} else {
	    current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	}
    return `${current.getFullYear()}-${current.getMonth()+1}`;
});

//returns a string with leading zero if single digit number
hbs.registerHelper('addLeadingZeros', function(num) {
    return num.toString().padStart(2, 0);
});

//Conditional that returns the content inside if the date parameter is later than the current date
hbs.registerHelper('isNotPastDate', function(date, options) {
    let today = new Date();
	let todayString = `${today.getFullYear().toString()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`;

    if (new Date(todayString) <= new Date(date)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

//Conditional that returns the content inside if the date parameter is later than the current date
hbs.registerHelper('isPastDate', function(date, options) {
    let today = new Date();
	let todayString = `${today.getFullYear().toString()}-${(today.getMonth() + 1).toString().padStart(2, 0)}-${today.getDate().toString().padStart(2, 0)}`;

    if (new Date(date) <= new Date(todayString)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

//Round the number to 2 decimal places
hbs.registerHelper('roundNumber', function(value) {
    if (!isNaN(value)) {
        return value.toFixed(2);
    } else {
        return value;
    }

});

hbs.registerHelper('ifStatus', function(v1, v2, options) {
  if(v1 || v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
