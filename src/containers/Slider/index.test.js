import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-04-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe('quand le slider est crée', ()=>{
  it ('ça doit afficher une liste de carte',async() =>{
    api.loadData = jest.fn().mockResolvedValue(data);
    window.console.error = jest.fn();
    render(
      <DataProvider>
      <Slider />
      </DataProvider>
    )
    expect(await screen.findByText("World economic forum")).toBeInTheDocument();
    expect(await screen.findByText("Oeuvre à la coopération entre le secteur public et le privé.")).toBeInTheDocument();
  })

  it("displays the correct description for each event", async () => {
    api.loadData = jest.fn().mockResolvedValue(data);

    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    expect(
      await screen.findByText("Oeuvre à la coopération entre le secteur public et le privé.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Evenement mondial autour du gaming")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Evenement mondial autour de la ferme")
    ).toBeInTheDocument();
  });
})
