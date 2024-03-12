using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.EntityConfigs;

public class AtmConfig:IEntityTypeConfiguration<AtmEntity>
{
    public void Configure(EntityTypeBuilder<AtmEntity> builder)
    {
        builder.ToTable("Atms");
        builder.Property(atm => atm.AtmId).ValueGeneratedOnAdd();
    } 
}