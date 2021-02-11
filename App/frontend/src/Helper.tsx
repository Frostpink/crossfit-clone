

export const getAge = (dob: string): number => {

    const diff = Date.now() - (new Date(dob)).getTime()
    const ageDate = new Date(diff)

    return Math.abs(ageDate.getUTCFullYear() - 1970)

}

export const formatDate = (dateString: string): string => {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(dateString)
    const dateFormat = `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`

    return dateFormat

}