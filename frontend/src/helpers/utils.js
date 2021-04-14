export const formatNumber = (value, params = {}, locale = 'en-US') => new Intl.NumberFormat(locale, params).format(value);

export function titleCase(str) {
    const wordsArray = str.toLowerCase().split(/\s+/);
    const upperCased = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.substr(1));
    return upperCased.join(' ');
}

export function getImagesPreview(files) {
    if (!files) {
        return Promise.reject();
    }

    const promises = [];
    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const { result } = e.target;
                resolve({
                    url: result,
                    filename: file?.name,
                    contentType: file?.type,
                    size: file?.size,
                });
            };

            reader.onerror = () => {
                reject();
            };

            reader.readAsDataURL(file);
        });
        promises.push(promise);
    });

    return Promise.all(promises);
}

export function downloadFile() {
    const createTemporaryLink = (url, filename) => {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return {
        byLink: createTemporaryLink,
        asBlob: (data, filename) => {
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            createTemporaryLink(url, filename);
        },
    };
}
