export const containersBuildStepList = (data) => {
    // example of regexp below: [ `#12 [image-name 4/6]` ]
    const matchList = data.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm);
    if (matchList) {
        return matchList.map((match) => {
            const matchElements = match.split(' ');
            if (matchElements.length === 3) {
                return matchElements.map((v, i) => ({
                    globalStep: matchElements[0],
                    imageName: matchElements[1],
                    currentImageSteps: matchElements[2]
                        .trim()
                        .split('/')
                        .map((v, i, arr) => {
                        if (arr.length === 2)
                            return arr.map((v, i, stepValues) => ({
                                currentStep: stepValues[0],
                                totalSteps: stepValues[1],
                            }));
                    }),
                }));
            }
        });
    }
};
