const makeNewObject = (arrWords, pageNumber) => {
    let pageObj = {
      arrWords,
      pageNumber: pageNumber || 1
    };
    pageObj.arrWords.push("\n");
    return pageObj;
  };
  
export const storyBuilder = (contributions, wordCount) => {
    return contributions.reduce((arr, contribution) => {
      let contributionArr = contribution.contribution.split(" ");
      let workingPage = arr[arr.length - 1];
      let stopingPoint = -1;
  
      if (!workingPage) {
        arr.push(makeNewObject(contributionArr));
      } else if (workingPage && workingPage.arrWords.length < wordCount) {
        for (let i = 0; i < contributionArr.length; i++) {
          if (workingPage.arrWords.length < wordCount) {
            workingPage.arrWords.push(contributionArr[i]);
          } else {
            stopingPoint = i - 1;
            break;
          }
        }
        if (stopingPoint > -1 && stopingPoint < contributionArr.length) {
          arr.push(
            makeNewObject(
              contributionArr.filter((e, i) => i > stopingPoint),
              workingPage.pageNumber + 1
            )
          );
        }
      }
      return arr;
    }, []);
  };
  