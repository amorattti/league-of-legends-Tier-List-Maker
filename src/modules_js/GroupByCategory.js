/* eslint-disable */
export class GroupByCategory {
  constructor(fetchedData) {
    this.data = fetchedData;
  }

  setUpByCategory(categoryName) {
    const sortByCategoryData = this.sortByCategory(
      this.data,
      categoryName
    );
		const duplicatesFilter = this.prevDuplicates(sortByCategoryData);
		console.log(duplicatesFilter)
    return duplicatesFilter;
  }

  prevDuplicates(arr) {
    const counts = arr.reduce(function (counts, item) {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    return Object.keys(counts).reduce(function (arr, item) {
      if (counts[item] === 1) {
        arr.push(item);
      }
      return arr;
    }, []);
  }

  sortByCategory(data, categoryName) {
    console.log({ data, categoryName });
    const arr = [];
    Object.values(data.data).forEach((item) => {
      if (item.tags.includes(categoryName)) {
        return arr.push(item.id);
      } else if (categoryName === 'All') {
        return arr.push(item.id);
      }
    });

    document.querySelectorAll('.tier-sort').forEach((item) => {
      Object.values(item.children).map((item) => arr.push(item.id));
    });

    document
      .querySelectorAll('.icon_champ')
      .forEach((item) => arr.push(item.id));

    return arr;
  }
}
