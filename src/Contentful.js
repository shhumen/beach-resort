import {createClient} from "contentful";

export default createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "53clgnwvnumv",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "QMj4q0cAycM5CvcbEshadpijPsqoY6TgStcsyHPm53M"
})