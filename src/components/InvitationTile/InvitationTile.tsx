const InvitationTile = (name: any) => {
  return (
    <div>
      <p> {name} wysłał Ci zaproszenie</p>
      <div>
        <button>Zaakceptuj</button>
        <button>Odrzuć</button>
      </div>
    </div>
  );
};

export default InvitationTile;
