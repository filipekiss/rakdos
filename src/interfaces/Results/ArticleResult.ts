export default interface ArticleResult {
    type?: string;
    id?: string;
    title?: string;
    description?: string;
    thumb_url?: string;
    input_message_content?: object;
    reply_markup?: object;
}
