exports.formateDate = (date) => {
    let r = date.match(/^\s*([0-9]+)\s*-\s*([0-9]+)\s*-\s*([0-9]+)(.*)$/);
    return r[3]+"."+r[2]+"."+r[1]+r[4];
}