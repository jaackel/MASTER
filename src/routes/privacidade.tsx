import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/privacidade")({
  component: Privacidade,
  head: () => ({
    meta: [
      { title: "Termos de Uso e Privacidade · Master Agent" },
      {
        name: "description",
        content: "Termos de uso do site e política de privacidade da Master Agent.",
      },
    ],
  }),
});

const CONTACT_EMAIL = "contato@masteragent.com.br";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function Privacidade() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-neon-cyan hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          VOLTAR AO SITE
        </Link>

        <div className="mt-10 inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-neon-cyan">
          <span className="w-8 h-px bg-neon-cyan" />
          // LEGAL
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Termos de Uso e<br />
          <span className="text-gradient-neon">Privacidade</span>
        </h1>
        <p className="mt-5 text-sm font-mono text-muted-foreground">
          Última atualização: outubro de 2026
        </p>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight">Termos de Uso</h2>

        <Section title="1. Aceitação">
          <p>
            Ao acessar e usar este site, você concorda com estes Termos de Uso e com a Política de
            Privacidade abaixo. Se não concordar, por favor não utilize o site.
          </p>
        </Section>

        <Section title="2. Uso do site">
          <p>
            Este site tem caráter informativo e apresenta os serviços da Master Agent. Você se
            compromete a utilizá-lo de forma lícita, sem tentar comprometer sua segurança,
            disponibilidade ou funcionamento.
          </p>
        </Section>

        <Section title="3. Propriedade intelectual">
          <p>
            Textos, marcas, logotipos, imagens e demais conteúdos deste site pertencem à Master
            Agent ou a seus parceiros e não podem ser copiados, reproduzidos ou distribuídos sem
            autorização prévia por escrito.
          </p>
        </Section>

        <Section title="4. Limitação de responsabilidade">
          <p>
            As informações publicadas não constituem proposta comercial vinculante. Condições de
            serviço são definidas em contrato específico. A Master Agent não se responsabiliza por
            danos decorrentes do uso indevido do site ou de indisponibilidades temporárias.
          </p>
        </Section>

        <Section title="5. Alterações">
          <p>
            Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre
            disponível nesta página.
          </p>
        </Section>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight">Política de Privacidade</h2>

        <Section title="1. Dados que coletamos">
          <p>
            Coletamos apenas os dados que você informa voluntariamente no formulário de contato:
            nome ou empresa, e-mail corporativo, área de interesse, faixa de orçamento e a descrição
            do seu desafio.
          </p>
        </Section>

        <Section title="2. Finalidade">
          <p>
            Esses dados são usados exclusivamente para responder ao seu contato, entender sua
            necessidade e apresentar uma proposta de serviço. Não vendemos nem compartilhamos seus
            dados para fins de marketing de terceiros.
          </p>
        </Section>

        <Section title="3. Base legal e compartilhamento">
          <p>
            O tratamento ocorre com base no seu consentimento e em procedimentos preliminares a um
            possível contrato, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 —
            LGPD). Os dados do formulário são transmitidos por um serviço de envio de e-mails
            contratado apenas para entregar sua mensagem à nossa equipe.
          </p>
        </Section>

        <Section title="4. Armazenamento e segurança">
          <p>
            Mantemos seus dados apenas pelo tempo necessário para atender à finalidade informada ou
            cumprir obrigações legais, adotando medidas técnicas e administrativas razoáveis para
            protegê-los.
          </p>
        </Section>

        <Section title="5. Seus direitos">
          <p>
            Você pode, a qualquer momento, solicitar acesso, correção, anonimização, portabilidade
            ou exclusão dos seus dados, bem como revogar seu consentimento, enviando um e-mail para{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-cyan hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            Este site não utiliza cookies de rastreamento ou publicidade. Podem ser usados apenas
            recursos técnicos essenciais ao funcionamento das páginas.
          </p>
        </Section>

        <Section title="7. Contato">
          <p>
            Dúvidas sobre estes termos ou sobre o tratamento dos seus dados:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-cyan hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
