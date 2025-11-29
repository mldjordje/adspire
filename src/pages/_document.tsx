import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

interface CustomDocumentProps extends DocumentInitialProps {
  locale?: string;
}

class MyDocument extends Document<CustomDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<CustomDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale || "sr" };
  }

  render() {
    const locale = this.props.locale || "sr";

    return (
      <Html lang={locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
