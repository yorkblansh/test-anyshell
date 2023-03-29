export const containersBuildStepList = (data: string) => {
	// example of regexp below: [ `#12 [image-name 4/6]` ]
	const matchList = data.match(/#\d{1,} \[\S+ \d{1,}\/\d{1,}\]/gm)

	if (matchList) {
		return matchList.map((match) => {
			const matchElements = match.split(' ')

			if (matchElements.length === 3) {
				return matchElements.map((v, i) => ({
					globalStep: matchElements[0],
					imageName: matchElements[1],
					currentImageSteps: matchElements[2]
						.trim()
						.split('/')
						.map((v, i, stepValues) => {
							if (stepValues.length === 2)
								return {
									currentStep: stepValues[0],
									totalSteps: stepValues[1],
								}
						})[0],
				}))
			}
		})
	}
}
