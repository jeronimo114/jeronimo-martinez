import { Composition, Folder } from "remotion";
import { AIAgentsTeaser } from "./AIAgentsTeaser";
import { RecapQueEsLLM } from "./recap/RecapQueEsLLM";
import { RecapQueEsAgente } from "./recap/RecapQueEsAgente";
import { RecapQueEsAPIMCP } from "./recap/RecapQueEsAPIMCP";
import { S2SystemPrompt } from "./sesion2/S2SystemPrompt";
import { S2Memoria } from "./sesion2/S2Memoria";
import { S2Herramientas } from "./sesion2/S2Herramientas";
import { S2Calculator } from "./sesion2/S2Calculator";
import { S2HTTPRequest } from "./sesion2/S2HTTPRequest";
import { S2IfNode } from "./sesion2/S2IfNode";
import { S2ArquitecturaChatbot } from "./sesion2/S2ArquitecturaChatbot";
import { S2JSON } from "./sesion2/S2JSON";
import { S2APIsGratuitas } from "./sesion2/S2APIsGratuitas";
import { S2FlujoMensaje } from "./sesion2/S2FlujoMensaje";
import { S2BuenasPracticas } from "./sesion2/S2BuenasPracticas";
import { S2IdeasChatbots } from "./sesion2/S2IdeasChatbots";
import { S2ShowcaseReservas } from "./sesion2-showcases/S2ShowcaseReservas";
import { S2ShowcaseEcommerce } from "./sesion2-showcases/S2ShowcaseEcommerce";
import { S2ShowcaseEducativo } from "./sesion2-showcases/S2ShowcaseEducativo";
import { S2ShowcaseEntretenimiento } from "./sesion2-showcases/S2ShowcaseEntretenimiento";
import { RECAP_VIDEO, SESSION2_VIDEO } from "./utils/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIAgentsTeaser"
        component={AIAgentsTeaser}
        durationInFrames={1260}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="Recap-Sesion2">
        <Composition
          id="RecapQueEsLLM"
          component={RecapQueEsLLM}
          durationInFrames={RECAP_VIDEO.durationInFrames}
          fps={RECAP_VIDEO.fps}
          width={RECAP_VIDEO.width}
          height={RECAP_VIDEO.height}
        />
        <Composition
          id="RecapQueEsAgente"
          component={RecapQueEsAgente}
          durationInFrames={RECAP_VIDEO.durationInFrames}
          fps={RECAP_VIDEO.fps}
          width={RECAP_VIDEO.width}
          height={RECAP_VIDEO.height}
        />
        <Composition
          id="RecapQueEsAPIMCP"
          component={RecapQueEsAPIMCP}
          durationInFrames={RECAP_VIDEO.durationInFrames}
          fps={RECAP_VIDEO.fps}
          width={RECAP_VIDEO.width}
          height={RECAP_VIDEO.height}
        />
      </Folder>
      <Folder name="Sesion2-Practico">
        <Composition
          id="S2SystemPrompt"
          component={S2SystemPrompt}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2Memoria"
          component={S2Memoria}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2Herramientas"
          component={S2Herramientas}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2Calculator"
          component={S2Calculator}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2HTTPRequest"
          component={S2HTTPRequest}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2IfNode"
          component={S2IfNode}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2ArquitecturaChatbot"
          component={S2ArquitecturaChatbot}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2JSON"
          component={S2JSON}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2APIsGratuitas"
          component={S2APIsGratuitas}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2FlujoMensaje"
          component={S2FlujoMensaje}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2BuenasPracticas"
          component={S2BuenasPracticas}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2IdeasChatbots"
          component={S2IdeasChatbots}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
      </Folder>
      <Folder name="Sesion2-Showcases">
        <Composition
          id="S2ShowcaseReservas"
          component={S2ShowcaseReservas}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2ShowcaseEcommerce"
          component={S2ShowcaseEcommerce}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2ShowcaseEducativo"
          component={S2ShowcaseEducativo}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
        <Composition
          id="S2ShowcaseEntretenimiento"
          component={S2ShowcaseEntretenimiento}
          durationInFrames={SESSION2_VIDEO.durationInFrames}
          fps={SESSION2_VIDEO.fps}
          width={SESSION2_VIDEO.width}
          height={SESSION2_VIDEO.height}
        />
      </Folder>
    </>
  );
};
