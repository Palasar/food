const postForm = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await result.json();
};

async function getResource(url) {
    let resouce = await fetch(url);

    if(!resouce.ok) {
        throw new Error(`could not fetch ${url} status: ${resouce.status}`);
    }

    return await resouce.json();
}

export {postForm, getResource};