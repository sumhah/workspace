export function setToken(token = {
    access_token: '',
    refresh_token: '',
    expires_in: 0,
    token_type: 'Bearer',
}) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getToken(name) {
    const token = JSON.parse(localStorage.getItem('token')) || {};
    return name ? token[name] : token;
}
