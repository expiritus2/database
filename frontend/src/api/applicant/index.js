export const createApplicant = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ success: true });
    }, 500);
});
