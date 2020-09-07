function getDate(compras) {
  compras.map((compra) => {
    var date2 = new Date().toJSON().slice(0, 10);
    // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
    var date1 = compra.date.split("T");
    date1 = date1[0];
    date1 = date1.split("-");
    date2 = date2.split("-");

    // Now we convert the array to a Date object, which has several helpful methods
    date1 = new Date(date1[0], date1[1], date1[2]);
    date2 = new Date(date2[0], date2[1], date2[2]);

    // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
    const date1_unixtime = parseInt(date1.getTime() / 1000);
    const date2_unixtime = parseInt(date2.getTime() / 1000);

    // This is the calculated difference in seconds
    const timeDifference = date2_unixtime - date1_unixtime;

    // in Hours
    const timeDifferenceInHours = timeDifference / 60 / 60;

    // and finaly, in days :)
    compra.dias_restantes = (timeDifferenceInHours / 24) * -1;
    // return timeDifferenceInHours / 24;
  });
  return compras;
}

export default getDate;
