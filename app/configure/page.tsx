import ConfigurationForm from "./ConfigurationForm";
import ModelCanvas from "./ModelCanvas";
import PartsTable from "./PartsTable";

export default function ConfigurePage() {
  return (
    <main className="space-y-6">
      <h2>configure your meadow desk</h2>

    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        <div>
          <h3>options</h3>
          <ConfigurationForm />
        </div>

        <div className="col-span-2">
          <ModelCanvas />
        </div>
      </div>

      <div>
        <h3>bill of materials</h3>
        <PartsTable />
      </div>
    </div>
    </main>
  );
}
