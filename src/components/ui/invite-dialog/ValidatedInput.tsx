export const ValidatedInput = () => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="full-name">Full Name</Label>
      <Input
        type="text"
        id="full-name"
        placeholder="Carl Chua"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      {nameMessage && <div className="text-red-500 text-xs">{nameMessage}</div>}
    </div>
  );
};
