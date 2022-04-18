export const csvToJson = (input: string) => {
  const data = input.split("\n");
  let result = [];

  let headers = data[0].split(",");
  let columns = headers.map((item) => {
    return item.replace(/"/g, "");
  });

  for (let i = 1; i < data.length - 1; i++) {
    let obj: any = {};

    let str = data[i];
    str = str.replace(/"/g, "");

    let properties = str.split(",");
    columns.map((item, index) => {
      const value = properties[index].replace(/"/g, "");
      obj[item] = value;
    });

    result.push(obj);
  }
  
  return { columns, data: result };
};
