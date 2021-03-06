﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SodaInventory.Model;

namespace SodaInventory.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20200221182712_Add_Registrations")]
    partial class Add_Registrations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SodaInventory.Model.Audit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("KeyValues")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NewValues")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OldValues")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TableName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Audits");
                });

            modelBuilder.Entity("SodaInventory.Model.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompanyName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("SodaInventory.Model.Item", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Units")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ItemId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("SodaInventory.Model.ItemQuantity", b =>
                {
                    b.Property<int>("ItemQuantityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("ItemId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("LastUpdated")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("ModerateLevel")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("StoreId")
                        .HasColumnType("int");

                    b.Property<decimal>("UrgentLevel")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("ItemQuantityId");

                    b.HasIndex("ItemId");

                    b.ToTable("ItemQuantities");
                });

            modelBuilder.Entity("SodaInventory.Model.Registration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompanyName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RegistrationCode")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Registrations");
                });

            modelBuilder.Entity("SodaInventory.Model.Store", b =>
                {
                    b.Property<int>("StoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StoreName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StreetAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ZipCode")
                        .HasColumnType("int");

                    b.HasKey("StoreId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("SodaInventory.Model.User", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.HasKey("Email");

                    b.HasIndex("CompanyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SodaInventory.Model.Item", b =>
                {
                    b.HasOne("SodaInventory.Model.Company", null)
                        .WithMany("Items")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("SodaInventory.Model.ItemQuantity", b =>
                {
                    b.HasOne("SodaInventory.Model.Item", null)
                        .WithMany("ItemQuantities")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("SodaInventory.Model.Store", b =>
                {
                    b.HasOne("SodaInventory.Model.Company", null)
                        .WithMany("Stores")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("SodaInventory.Model.User", b =>
                {
                    b.HasOne("SodaInventory.Model.Company", null)
                        .WithMany("Users")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
