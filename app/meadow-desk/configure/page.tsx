import ConfigurationForm from "./ConfigurationForm";
import ModelCanvas from "./ModelCanvas";
import PartsTable from "./PartsTable";

export default function ConfigurePage() {
  return (
    <main className="space-y-12">
      <div className="space-y-6">
        <h2>configure your meadow desk</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <div className="space-y-2">
            <ConfigurationForm />
          </div>

          <div className="col-span-2">
            <ModelCanvas />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2>bill of materials</h2>
        <PartsTable />
      </div>
    </main>
  );
}
