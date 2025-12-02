export const getRecentMonths = () => {
    const months = []
    const date = new Date()
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    for (let i = 0; i < 4; i++) {
        months.push(monthNames[date.getMonth()])
        date.setMonth(date.getMonth() - 1)
    }

    return months
}