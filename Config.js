let ApiUrl="";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
   ApiUrl="http://localhost:60705/";
} else {
   ApiUrl="http://localhost:60705/";
}

export { ApiUrl };
