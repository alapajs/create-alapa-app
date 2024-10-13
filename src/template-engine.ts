export function TemplateEngine(
  template: string,
  context: { [key: string]: any }
) {
  template = template.replace(/\{\{\s?(.*?)\s?\}\}/g, (match, key) => {
    try {
      const value = context[key.toString().trim()];
      return value;
    } catch (e) {
      return "";
    }
  });
  return template;
}
