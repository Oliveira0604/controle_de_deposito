export const formatName = (name) => {
    const formattedName = name.split(' ').map(name => 
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    ).join(' ');

    return formattedName;
}