const statistics = (links) => {
  const totalLinks = links.length;
  const arrLinks = links.map((elem) => elem.href);
  const uniqueLinks = [...new Set(arrLinks)];
  const stats = `Total: ${totalLinks}\nUnique: ${uniqueLinks.length}`;
  return stats;
};

const broken = (links) => {
    const brokenLinks = Array.from(links).filter((elem) => elem.status >= 400)
    const stats = `\nBroken: ${brokenLinks.length}`;
    return stats;
}

module.exports = {statistics, broken}